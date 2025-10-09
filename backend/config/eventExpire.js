import cron from 'node-cron'
import Events from '../models/event.model.js'

cron.schedule("0 0 * * *", async()=>{
    try{
        const today = new Date();
        const result =await Events.updateMany(

            {eventDate: {$lt: today}},
            {$set:{isExpired: true}}

        )
    }catch(error){
        console.log(error)
    }

})