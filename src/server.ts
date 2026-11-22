// 1. Define strict domain models instead of using 'any'
interface GeoCoordinates {
    lat: string;
    lng: string;
}
interface CompanyDetails {
    name: string;
    catchPhrase: string;
}
// Transparent representation of the external API schema
interface ExternalUserResponse {
    id: number;
    name: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: GeoCoordinates;
    };
    phone: string;
    website: string;
    company: CompanyDetails;
}

// Structured Clean Representation used inside our application business logic
interface ProcessedUser {
    userId: number;
    fullName: string;
    corporateEmail: string;
    location: string;
}

// 2. Pure function with explicit return types
function mapUserResponse(user: ExternalUserResponse): ProcessedUser 
    {
    return {
        userId: user.id,
        fullName: user.name,
        corporateEmail: user.email.toLowerCase(),
        location: `${user.address.city}, ${user.address.street}`,
    };
}

// 3. Robust Asynchronous Fetch Engine
async function fetchAndProcessUsers(endpoint: string):
    Promise<ProcessedUser[]> {
        try {
            const response = await fetch(endpoint);
            // Always check network level status codes explicitly
            if (!response.ok) {
                throw new Error(`HTTP Error: Safe execution halted with status ${response.status}`);
            }
            const rawData = await response.json() as ExternalUserResponse[];
            
            // Pure structural array transformation
            return rawData.map(mapUserResponse);
        } 
        catch (error) {
            // Graceful failure isolation so the Event Loop never crashes
            console.error("Critical Engine Failure:", error instanceof Error ? error.message : "Unknown Panic");
            return [];
        }
    }

// Execution Entry Point
const TARGET_API = "https://jsonplaceholder.typicode.com/users";
fetchAndProcessUsers(TARGET_API).then((processedData) => {
    console.log(`Successfully parsed ${processedData.length} records into corporate format.`);
    console.dir(processedData);
});