#!/usr/bin/env python3
from __future__ import annotations

import argparse
import logging
import shutil
from pathlib import Path
from typing import Any, Callable, Dict, Optional, Set
from functools import wraps

from PIL import Image, UnidentifiedImageError

# ---------------------------
# CONFIG
# ---------------------------

IMAGE_EXTENSIONS: Set[str] = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".gif", ".webp", ".avif"}

PREFER_AVIF: bool = True   # Use AVIF if available, otherwise WebP
WEBP_QUALITY: int = 80
AVIF_QUALITY: int = 45     # AVIF uses lower numbers for high quality
LOG_FILENAME: str = "image_copy_convert_compress.log"

# ---------------------------
# Runtime Type Checker
# ---------------------------

def runtime_type_check(func: Callable[..., Any]) -> Callable[..., Any]:
    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        annotations: Dict[str, Any] = func.__annotations__
        names = func.__code__.co_varnames[: func.__code__.co_argcount]
        bound = dict(zip(names, args)) | kwargs
        for name, expected in annotations.items():
            if name == "return" or name not in bound:
                continue
            if isinstance(expected, type) and not isinstance(bound[name], expected):
                raise TypeError(
                    f"{func.__name__}: '{name}' expected {expected}, got {type(bound[name])}"
                )
        return func(*args, **kwargs)
    return wrapper

# ---------------------------
# Logging
# ---------------------------

def configure_logger(log_file: str) -> logging.Logger:
    logger = logging.getLogger("img_pipeline")
    logger.setLevel(logging.DEBUG)
    if not logger.handlers:
        ch = logging.StreamHandler()
        fh = logging.FileHandler(log_file, encoding="utf-8")
        ch.setLevel(logging.INFO)
        fh.setLevel(logging.DEBUG)
        fmt = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
        ch.setFormatter(fmt)
        fh.setFormatter(fmt)
        logger.addHandler(ch)
        logger.addHandler(fh)
    return logger

# ---------------------------
# Utils
# ---------------------------

@runtime_type_check
def is_image_file(path: Path) -> bool:
    if not path.is_file() or path.suffix.lower() not in IMAGE_EXTENSIONS:
        return False
    try:
        with Image.open(path):
            return True
    except UnidentifiedImageError:
        return False

@runtime_type_check
def build_copy_root(root: Path, logger: logging.Logger) -> Path:
    target = root.parent / "copy" / root.name
    target.mkdir(parents=True, exist_ok=True)
    logger.info(f"Copy root: {target}")
    return target

# ---------------------------
# Step 1: COPY ORIGINALS
# ---------------------------

@runtime_type_check
def copy_images(root: Path, copy_root: Path, logger: logging.Logger) -> int:
    count = 0
    for file in root.rglob("*"):
        if is_image_file(file):
            rel = file.relative_to(root)
            dest = copy_root / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(file, dest)
            logger.info(f"Copied -> {dest}")
            count += 1
    return count

# ---------------------------
# Step 2: FORMAT CONVERSION
# ---------------------------

@runtime_type_check
def convert_to_web_format(path: Path, logger: logging.Logger) -> Optional[Path]:
    try:
        with Image.open(path) as img:
            img = img.convert("RGB")

            target_ext = ".webp"
            save_kwargs = {"quality": WEBP_QUALITY}

            if PREFER_AVIF:
                try:
                    Image.new("RGB", (1, 1)).save(path.parent / "test.avif", format="AVIF")
                    target_ext = ".avif"
                    save_kwargs = {"quality": AVIF_QUALITY}
                except Exception:
                    pass

            new_path = path.with_suffix(target_ext)
            tmp_path = path.parent / (".tmp_img_" + path.stem + target_ext)
            img.save(tmp_path, format=target_ext.replace(".", "").upper(), **save_kwargs)
            tmp_path.replace(new_path)

            path.unlink()
            logger.info(f"Converted: {path.name} -> {new_path.name}")
            return new_path

    except Exception as e:
        logger.error(f"Conversion failed for {path}: {e}")
        return None

@runtime_type_check
def convert_all_images(root: Path, skip_root: Path, logger: logging.Logger) -> int:
    converted = 0
    for file in root.rglob("*"):
        if skip_root in file.parents:
            continue
        if is_image_file(file) and file.suffix.lower() not in {".webp", ".avif"}:
            if convert_to_web_format(file, logger):
                converted += 1
    return converted

# ---------------------------
# Step 3: FINAL COMPRESSION
# ---------------------------

@runtime_type_check
def compress_web_images(root: Path, skip_root: Path, logger: logging.Logger) -> int:
    count = 0
    for file in root.rglob("*"):
        if skip_root in file.parents:
            continue
        if file.suffix.lower() in {".webp", ".avif"}:
            try:
                with Image.open(file) as img:
                    tmp_path = file.parent / (".tmp_img_" + file.stem + file.suffix)
                    if file.suffix.lower() == ".webp":
                        img.save(tmp_path, format="WEBP", quality=WEBP_QUALITY)
                    else:
                        img.save(tmp_path, format="AVIF", quality=AVIF_QUALITY)
                    tmp_path.replace(file)
                    logger.info(f"Compressed: {file}")
                    count += 1
            except Exception as e:
                logger.error(f"Compression failed for {file}: {e}")
    return count

# ---------------------------
# MAIN PIPELINE
# ---------------------------

@runtime_type_check
def run(root: Path, logger: logging.Logger) -> None:
    if not root.exists():
        raise FileNotFoundError(root)

    copy_root = build_copy_root(root, logger)

    copied = copy_images(root, copy_root, logger)
    logger.info(f"Copied {copied} images")

    converted = convert_all_images(root, copy_root, logger)
    logger.info(f"Converted {converted} images to WebP/AVIF")

    compressed = compress_web_images(root, copy_root, logger)
    logger.info(f"Compressed {compressed} images")

# ---------------------------
# CLI
# ---------------------------

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, type=str)
    parser.add_argument("--log", default=LOG_FILENAME)
    args = parser.parse_args()

    logger = configure_logger(args.log)
    run(Path(args.root).resolve(), logger)

if __name__ == "__main__":
    main()
