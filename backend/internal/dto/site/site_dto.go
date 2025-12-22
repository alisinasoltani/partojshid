package site

type MenuItem struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
}

type NavbarMenu struct {
	Title     string     `json:"title"`
	MenuItems []MenuItem `json:"menu_items,omitempty"`
	URL       string     `json:"url"`
}

type Navbar struct {
	Logo       string       `json:"logo"`
	About      NavbarMenu   `json:"about"`
	Activities NavbarMenu   `json:"activities"`
	Projects   NavbarMenu   `json:"projects"`
	Lodge      NavbarMenu   `json:"lodge"`
	Contact    NavbarMenu   `json:"contact"`
}

type About struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Subitle     []string `json:"subitle,omitempty"`
	Image       string   `json:"image"`
}

type ProjectRef struct {
	Name       string `json:"name"`
	ProjectURL string `json:"projectUrl"`
	ImageURL   string `json:"imageUrl"`
}

type ProjectsSection struct {
	Row1 []ProjectRef `json:"row1,omitempty"`
	Row2 []ProjectRef `json:"row2,omitempty"`
}

type Stat struct {
	Name   string `json:"name"`
	Number int    `json:"number"`
	URL    string `json:"url"`
}

type Stats struct {
	Title string `json:"title"`
	Stats []Stat `json:"stats,omitempty"`
}

type ServiceItem struct {
	ID          int     `json:"id"`
	Title       string  `json:"title"`
	VideoURL    string  `json:"videoUrl"`
	InitialGrow float64 `json:"initialGrow"`
	FinalGrow   float64 `json:"finalGrow"`
}

type LodgeProject struct {
	Name  string `json:"name"`
	Image string `json:"image"`
}

type Lodge struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	LodgeLogo   string `json:"lodge_logo"`
}

type Certificate struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Logo  string `json:"logo"`
}

type Licenses struct {
	Title        string       `json:"title"`
	Certificates []Certificate `json:"certificates,omitempty"`
}

type Contact struct {
	Title     string `json:"title"`
	Address   string `json:"address"`
	Cellphone string `json:"cellphone"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	Instagram string `json:"instagram"`
	Whatsapp  string `json:"whatsapp"`
	Telegram  string `json:"telegram"`
}

type Footer struct {
	Title   string  `json:"title"`
	Contact Contact `json:"contact"`
}

type SiteConfig struct {
	Title         string          `json:"title"`
	Navbar        Navbar          `json:"navbar"`
	About         About           `json:"about"`
	Projects      ProjectsSection `json:"projects"`
	Stats         Stats           `json:"stats"`
	Services      []ServiceItem   `json:"services,omitempty"`
	Lodge         Lodge           `json:"lodge"`
	LodgeProjects []LodgeProject  `json:"lodge_projects,omitempty"`
	Licenses      Licenses        `json:"licenses"`
	Footer        Footer          `json:"footer"`
}

// Update request with pointers for partial updates
type UpdateSiteConfigRequest struct {
	Title         *string          `json:"title,omitempty"`
	Navbar        *Navbar          `json:"navbar,omitempty"`
	About         *About           `json:"about,omitempty"`
	Projects      *ProjectsSection `json:"projects,omitempty"`
	Stats         *Stats           `json:"stats,omitempty"`
	Services      *[]ServiceItem   `json:"services,omitempty"` // pointer to slice
	Lodge         *Lodge           `json:"lodge,omitempty"`
	LodgeProjects *[]LodgeProject  `json:"lodge_projects,omitempty"` // pointer to slice
	Licenses      *Licenses        `json:"licenses,omitempty"`
	Footer        *Footer          `json:"footer,omitempty"`
}