const mockUsers = {
  customers: [
    { 
      id:  'c1', 
      email: 'customer@test. com', 
      password: 'customer123', 
      name: 'John Doe', 
      phone: '9876543210',
      tokenBalance: 500,
      totalOrders:  23,
      joinedDate: '2024-01-15'
    }
  ],
  sellers: [
    { 
      id: 's1', 
      email: 'seller@test.com', 
      password: 'seller123', 
      name: 'Mike Smith', 
      shopName: 'Tasty Bites Kitchen',
      totalSales: 15420,
      todayOrders: 18,
      rating: 4.8,
      joinedDate: '2023-11-20'
    }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  loginCustomer: async (email, password) => {
    await delay(1200);
    
    const customer = mockUsers.customers. find(
      c => c. email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    
    if (customer) {
      const { password: _, ...userWithoutPassword } = customer;
      return { 
        success: true, 
        user: { ...userWithoutPassword, role: 'customer' } 
      };
    }
    
    return { success:  false, error: 'Invalid email or password' };
  },

  loginSeller: async (email, password) => {
    await delay(1200);
    
    const seller = mockUsers.sellers.find(
      s => s.email.toLowerCase() === email.toLowerCase() && s.password === password
    );
    
    if (seller) {
      const { password: _, ...userWithoutPassword } = seller;
      return { 
        success: true, 
        user: { ...userWithoutPassword, role: 'seller' } 
      };
    }
    
    return { success: false, error: 'Invalid email or password' };
  },

  // NEW: Register Customer function
  registerCustomer: async (name, email, password) => {
    await delay(1500);
    
    // Check if email already exists
    const emailExists = mockUsers.customers.some(
      c => c.email.toLowerCase() === email.toLowerCase()
    ) || mockUsers.sellers.some(
      s => s.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
      return { 
        success: false, 
        error: 'Email already registered. Please use a different email or login.' 
      };
    }
    
    // Create new customer
    const newCustomer = {
      id:  `c${mockUsers.customers.length + 1}`,
      email:  email.toLowerCase(),
      password: password,
      name: name,
      phone: '',
      tokenBalance: 0,
      totalOrders: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to mock database
    mockUsers.customers.push(newCustomer);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newCustomer;
    return { 
      success: true, 
      user: { ...userWithoutPassword, role: 'customer' } 
    };
  },

  // NEW: Register Seller function
  registerSeller: async (name, email, password) => {
    await delay(1500);
    
    // Check if email already exists
    const emailExists = mockUsers.customers.some(
      c => c.email.toLowerCase() === email.toLowerCase()
    ) || mockUsers.sellers.some(
      s => s.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
      return { 
        success: false, 
        error: 'Email already registered. Please use a different email or login.' 
      };
    }
    
    // Create new seller
    const newSeller = {
      id: `s${mockUsers.sellers.length + 1}`,
      email: email.toLowerCase(),
      password: password,
      name: name,
      shopName: `${name}'s Shop`,
      totalSales: 0,
      todayOrders: 0,
      rating: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to mock database
    mockUsers.sellers.push(newSeller);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newSeller;
    return { 
      success: true, 
      user:  { ...userWithoutPassword, role: 'seller' } 
    };
  },

  // Keep the old register function for backward compatibility
  register: async (userData, role) => {
    await delay(1500);
    return { success: true, message: 'Registration successful!  Please login.' };
  }
};