const TASK_API_URL = "https://ralftischer.pythonanywhere.com"
//const TASK_API_URL = "http://127.0.0.1:5000"
//const TASK_API_URL = "http://192.168.2.111:5555"

class TaskAPI {
    constructor(baseURL = TASK_API_URL) {
        this.baseURL = baseURL;
    }

    async getAllLists(token, sortBy = null) {
        let url = `${this.baseURL}/lists`; 
        
        // Add sort by
        if (sortBy) {
            url += "&sort_by=" + sortBy;
        };

        console.log("url:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return await response.json();
    }

    async getAllTasks(token, plList = 0, sortBy = null) {
        let url = `${this.baseURL}/tasks` + "?list_id=" + plList; 
        
        // Add sort by
        if (sortBy) {
            url += "&sort_by=" + sortBy;
        };

        console.log("url:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return await response.json();
    }

    async getTaskById(token, id, sortBy) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}&sort_by=${sortBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.json();
    }

    async createList(token, data) {
        const response = await fetch(`${this.baseURL}/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async createTask(token, data) {
        const response = await fetch(`${this.baseURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async updateProfile(token, data) {
        // Update user profile
        const response = await fetch(`${this.baseURL}/login`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });

        if ("username" in data) {
            // Update related lists
            const new_username = data.username;
            
            const response_lists = await fetch(`${this.baseURL}/lists`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({username: new_username})
            });
        }

        return response.json();
    }

    async updateList(token, id, data) {
        const response = await fetch(`${this.baseURL}/lists?rowid=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async updateTask(token, id, data) {
        console.log("Updating with: ", data);
        const response = await fetch(`${this.baseURL}/tasks?rowid=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async deleteList(token, id) {
        // Delete related tasks
        await fetch(`${this.baseURL}/tasks?list_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        // Delete list itself
        const responseList = await fetch(`${this.baseURL}/lists?rowid=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return responseList.json();
    }

    async deleteTask(token, id) {
        const response = await fetch(`${this.baseURL}/tasks?rowid=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return response.json();
    }

    async login(username, password) {
        console.log("Starting login");

        if (!username || !password) {
            return false;
        }
        
        const response = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              password
            }),
          });

        const data = await response.json();
        console.log(data);
        
        if (data && data.message === "Login succesful" && data.token) {
        console.log("Login successful.");
        return data;
        } else {
        console.log("Login incorrect.");
        return data;
        }
    }

    async updateUsername(token, username) {
        console.log("Updating username to", username);
    }

    async updatePassword(token, password) {
        console.log("Updating password to", password);
    }
}

export default TaskAPI;
