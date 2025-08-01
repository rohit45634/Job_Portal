const testcontroller=(req,res)=>{

          const {name}=req.body
          res.status(200).send(`your name ${name}`)
}
export default testcontroller;
