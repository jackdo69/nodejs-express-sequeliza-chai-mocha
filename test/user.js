//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import chaiThings from "chai-things"
import server from "../app.js";
let should = chai.should();

import User from '../models/user.model.js'

chai.use(chaiHttp);
chai.use(chaiThings);

describe("Users", () => {
  beforeEach((done) => {
    //Before each test we should empty the database
    User.destroy({
      where: {},
      truncate: true
    });
    done()
  });

  /*
     * Test the /GET route
     */
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
  * Test the /PUT route
  */
  describe('/PUT/add user', () => {
    it('it should not POST a user without name field', (done) => {
      let user = {
        "age": 45,
        "email": "benny@test.com"
      }
      chai.request(server)
        .put('/users/add')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.include.something.that.deep.equals({
            "msg": "name does not Empty",
            "param": "name",
            "location": "body"
          })
          done();
        });
    });

    it('it should POST an user ', (done) => {
      let user = {
        "name": "Tommy",
        "age": 29,
        "email": "tommy@test.com"
      }
      chai.request(server)
        .put('/users/add')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.should.have.property('age');
          done();
        });
    });

  });

  /*
  * Test the /POST route
  * Add a new user into database and update it
  */
  describe('/POST/update user', () => {
    it('it should UPDATE an user given the id', (done) => {
      const user = {
        name: "Lily",
        email: "lily@test.com",
        age: 20
      }

      User.create(user)
        .then(newUser => {
          const id = newUser.id;
          chai.request(server)
            .post('/users/update')
            .send({
              name: "LilyTaylor",
              email: "lilytaylor@test.com",
              age: 21,
              id: id
            }).end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('User updated!');
              res.body.user.should.have.property('name').eql("LilyTaylor");
              done()
            })
        })

    });
  });

  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {

      const user = {
        name: "Lily",
        email: "lily@test.com",
        age: 20
      }

      User.create(user)
        .then(newUser => {
          const id = newUser.id;
          chai.request(server)
            .delete('/users/delete/' + id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("User deleted!");
              done();
            })
        })

    });
  });
});
