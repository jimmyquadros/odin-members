const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const messageSchema = new Schema({
    content: { type: String },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    date_posted: { type: Date },
    date_updated: { type: Date },
});


messageSchema.virtual('url').get(function() {
    return `/message/${this.id}`;
})

messageSchema.virtual('posted_to_now').get(function() {
    return `Posted ${timeUntilNow(DateTime.fromJSDate(this.date_posted))}`;
})

messageSchema.virtual('updated_to_now').get(function() {
    return `edited ${timeUntilNow(DateTime.fromJSDate(this.date_updated))}`;
})

// Returns string of largest length of time in '<time> <unit of measure> ago'
const timeUntilNow = (from) => {
    const allTimes = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    const timeFrom = DateTime.now().diff(from, allTimes).toObject();
    for (let i = 0; i < allTimes.length; i++) {
        let timeMeasure = allTimes[i];
        const value = Math.floor(timeFrom[timeMeasure]);
        if (value === 1) timeMeasure = timeMeasure.slice(0, -1); // Prevent pluralizing singule units
        if (value > 0) return `${value} ${timeMeasure} ago`
    }
    return 'now';
}

module.exports = mongoose.model('Message', messageSchema);