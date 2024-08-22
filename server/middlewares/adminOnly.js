module.exports = async function adminOnly(req, res, next) {
    try {
    
        if (req.user.role !== 'Admin') 
            return res.status(401).json({ message: 'Unauthorized' })

        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}