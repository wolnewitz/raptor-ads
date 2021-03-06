const models = require('../../../database/schemas.js');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'bobbyisbadatstarcraft';

module.exports = {
  getOne: (req, res) => {
    models.User.findOne({
      where: {
        id: req.params.id,
        isDeleted: false,
      },
      include: [models.Rating],
    })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(400).send('User not found!');
        }
      });
  },

  getAll: (req, res) => {
    models.User.findAll({
      where: {
        isDeleted: false,
      },
    })
      .then((users) => {
        res.send(users);
      });
  },

  createOne: (req, res) => {
    models.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(10);
          const passwordToSave = bcrypt.hashSync(req.body.password, salt);

          models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: passwordToSave,
            email: req.body.email,
            role: req.body.role,
            businessName: req.body.businessName,
            isDeleted: false,
          })
            .then((createdUser) => {
              const token = jwt.sign({
                email: createdUser.email,
                firstName: createdUser.firstName,
                id: createdUser.id,
              }, secret, { expiresIn: '1h' });

              res.json({ token, user: createdUser });
            });
        } else {
          res.send({ error: 'User already exists!' });
        }
      });
  },

  patchOne: (req, res) => {
    models.User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        models.User.findOne({
          where: {
            id: req.params.id,
          },
        })
          .then((user) => {
            res.json(user);
          });
      });
  },

  deleteOne: (req, res) => {
    models.User.update({ isDeleted: true }, {
      where: {
        id: req.params.id,
        isDeleted: false,
      },
    })
      .then((status) => {
        if (status === 1) {
          res.send('User deleted!');
        } else {
          res.send('User did not exist');
        }
      });
  },
};
