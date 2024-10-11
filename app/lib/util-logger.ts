
export function Error(message: String, exception: any): void {
    console.log(`[ERROR] ${message}`);
  }
  
  export function Diagnostic(message: String, object?: any): void {
    const isProduction = process.env.NODE_ENV === "production";
    if (!isProduction) {
      if (object === undefined) {
        console.log(`[DIAGNOSTIC] ${message}`, object);
      } else {
        console.log(`[DIAGNOSTIC] ${message}`, object);
      }
    }
  }
  