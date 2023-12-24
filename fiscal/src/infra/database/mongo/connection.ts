import mongoose from 'mongoose';

class MongoDatabaseConnect {
    constructor(private readonly url: string) {}

    async connect() {
        try {
            await mongoose.connect(this.url);
            console.log('MONGO DATABASE HAS BEEN CONNECTED');
        } catch(err: any) {
            console.log('MONGO DATABASE FAILED WHEN CONNECTED', err.message);
        }
    }

    async disconnect() {
        await mongoose.disconnect();
        console.log('MONGO DATABASE HAS BEEN DISCONNECTED');
    }
}

export class MongoDatabaseConnectSingleton {
    private static instance: MongoDatabaseConnect | null = null

    static getInstance(
        url: string
    ) {
        if(!this.instance) {
            this.instance = new MongoDatabaseConnect(url)
        }

        return this.instance
    }
}
