class ForbiddenError extends Error {
    
    constructor(
        public error: string, 
        public message: any
    ) {
        super(message);
    }
}

export default ForbiddenError;