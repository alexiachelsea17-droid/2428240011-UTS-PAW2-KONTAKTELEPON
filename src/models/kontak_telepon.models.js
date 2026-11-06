import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        nama_kontak: {
            type: String,
            required: true,
        },
        nomor_telepon: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const KontakTeleponModels = mongoose.model("kontak_telepon", schema);

export default KontakTeleponModels;