interface User {
    name: string;
    email: string;
    role: 'staff' | 'supervisor' | 'leader' | 'admin';
  }
export default User;  