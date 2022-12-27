const express=require('express');
const userRouter=require('./router/routes')
const PORT=3000;
const app=express();

// app.get('/',(req,res)=>{
//   res.send('Server started!')
// })

app.use('/api',userRouter)



app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));

