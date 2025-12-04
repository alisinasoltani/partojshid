'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
// import { Label } from '@/components/ui/Label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import api from '../lib/api';
import { LoginRequest } from '@/types/auth';
import { LoginResponseSchema } from '../types/auth';

// Define Zod schema for form validation
const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must be at most 50 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm: React.FC = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await api.post('/auth/login', data);
            return response.data;
        },
        onSuccess: (data) => {
            const parsed = LoginResponseSchema.parse(data);
            Cookies.set('jeyshid', parsed.token, { expires: 1, sameSite: 'strict' });
            router.push('/panel');
        },
        onError: (error) => {
            console.error('Login mutation failed:', error);
            form.setError('root', { message: 'Login failed. Please check your credentials or network.' });
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md w-full p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {form.formState.errors.root && (
                    <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
                )}

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full"
                >
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;