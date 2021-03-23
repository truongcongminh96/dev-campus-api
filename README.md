# dev-campus-api
NodeJs Backend

#Using async/await in ExpressJS middlewares
https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware

      const asyncHandler = fn => (req, res, next) =>
        Promise
          .resolve(fn(req, res, next))
          .catch(next)


#Security
https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html

example:
![plot](mongo-injection.PNG)