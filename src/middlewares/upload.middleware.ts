import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, `${process.cwd()}/src/profile-images`);
  },
  filename(req: Express.Request, file: Express.Multer.File, callback) {
    try {
      const filename = `${~~(Math.random() * 1000000)}-${file.originalname}`;
      if (req.file?.originalname) {
        req.file.originalname = filename;
      }
      callback(null, filename);
    } catch (error) {
      console.log(error, ":::");
    }
  },
});

export default storage;
