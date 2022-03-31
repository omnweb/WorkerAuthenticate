class DatabaseError extends Error {
    
    constructor(
        public error: string, 
        public message: any
    ) {
        super(message);
    }
}

export default DatabaseError;