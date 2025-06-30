import { userSchema, type CreateUserData, type UpdateUserData, type User, type UserFilters, type UsersQueryParams } from "../types/user";


const BASE_URL = "http://localhost:3001";

class UserService {

    // wrapper per la fetch con validazione
    private async fetchWithValidation<T>(url: string, options?: RequestInit): Promise<T> {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers
            },
            ...options
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async getUsers(params?: UsersQueryParams): Promise<User[]> {
        const url = new URL(`${BASE_URL}/users`);

        // aggiunge la paginatura alla url
        if (params?.page && params?.limit) {
            url.searchParams.set("_page", params.page.toString());
            url.searchParams.set("_limit", params.limit.toString());
        }

        // aggiunge i filtri alla url
        if (params?.filters?.name) {
            url.searchParams.set("name", params.filters.name);
        }
        if (params?.filters?.username) {
            url.searchParams.set("username", params.filters.username);
        }
        if (params?.filters?.email) {
            url.searchParams.set("email", params.filters.email);
        }
        if (params?.filters?.city) {
            url.searchParams.set("city", params.filters.city);
        }
        if (params?.filters?.search) {
            url.searchParams.set("search", params.filters.search);
        }

        const users = await this.fetchWithValidation<User[]>(url.toString());
        // valida ogni user con zod e lo restituisce tipizzato
        return users.map(user => userSchema.parse(user));
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.fetchWithValidation<User>(`${BASE_URL}/users/${id}`);
        return userSchema.parse(user);
    }

    async createUser(userData: CreateUserData): Promise<User> {
        const user = await this. fetchWithValidation<User>(`${BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify(userData)
        });
        return userSchema.parse(user);
    }

    async updateUser(id: number, userData: UpdateUserData): Promise<User> {
        const user = await this.fetchWithValidation<User>(`${BASE_URL}/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify(userData)
        });
        return userSchema.parse(user);
    }

    async deleteUser(id: number): Promise<void> {
        await this.fetchWithValidation<void>(`${BASE_URL}/users/${id}`, {
            method: "DELETE"
        });
    }

    filterUsers(users: User[], filters: UserFilters): User[] {
        return users.filter(user => {
            if (filters.name && !user.name.includes(filters.name)) return false;
            if (filters.username && !user.username.includes(filters.username)) return false;
            if (filters.email && !user.email.includes(filters.email)) return false;
            if (filters.city && !user.address.city.includes(filters.city)) return false;
            if (filters.search && !user.name.includes(filters.search) && !user.username.includes(filters.search) && !user.email.includes(filters.search) && !user.address.city.includes(filters.search)) return false;
            return true;
        })
    }

}

export const userService = new UserService();