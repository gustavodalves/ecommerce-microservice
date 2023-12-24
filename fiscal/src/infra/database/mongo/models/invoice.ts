import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    _id: String,
    productName: String,
    customerTaxId: String,
    orderDate: Date,
    createdAt: { type: Date, default: new Date() }
});

export default mongoose.model('Invoice', InvoiceSchema);
