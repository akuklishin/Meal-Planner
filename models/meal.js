import {Schema, model, models} from 'mongoose';

const MealSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    productsList: [{
        name: {
            type: String,
            required: true,
            index: false
        },
        calories: {
            type: Number,
            required: true
        },
        proteins: {
            type: Number,
            required: true
        },
        carbs: {
            type: Number,
            required: true
        },
        fat: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    note: {
        type: String
    }
});

const Meal = models.Meal || model('Meal', MealSchema);

export default Meal;
