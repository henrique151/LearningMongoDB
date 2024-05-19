import mongoose from "mongoose"

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://henriqueporto949:TTpfHBc2lzXqYyu1@blossom-app.ttknwyf.mongodb.net/?retryWrites=true&w=majority&appName=blossom-app"
        )
        if(connection) {
            console.log("Connection established")
        }
    } catch (error) {
        console.log("Error in connectToDatabase", error)
        throw error
    }
}

export default connectToDatabase