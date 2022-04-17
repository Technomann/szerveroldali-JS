const expect = require('chai').expect;
const getSpacecraftsMW = require('../../../../middlewares/spacecraft/getSpacecraftsMW');

describe('getSpacecraft middleware ', function () {

    it('should set res.locals.spacecrafts with spacecrafts from db', (done) => {
        const mw = getSpacecraftsMW({
            SpacecraftModel:  {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb(null, ['mockspacecraft1', 'mockspacecraft2']);
                }
            }
        });

        const resMock = {
            locals: {

            }
        }
        mw({},
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.spacecrafts).to.be.eql(['mockspacecraft1', 'mockspacecraft2']);
            done();
        });
    });

    it('should set res.locals.error message and code, and should call res.redirect with /error', (done) => {
        const mw = getSpacecraftsMW({
            SpacecraftModel:  {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb('dberror', null);
                }
            }
        });

        const resMock = {
            locals: {
                error: {

                }
            }, 
            redirect: (route) => {
                expect(route).to.be.eql('/error');
                expect(resMock.locals.error.message).to.be.eql('Error during getting Spacecrafts from DB.');
                expect(resMock.locals.error.code).to.be.eql('725');
                done();
            }
        };
        
        mw({},
        resMock,
        () => {});
    });

    it('no matching spacecrafts in the db, res.locals.spacecrafts should be empty array', (done) => {
        const mw = getSpacecraftsMW({
            SpacecraftModel:  {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb(undefined, []);
                }
            }
        });

        const resMock = {
            locals: {

            }
        };
        
        mw({},
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.spacecrafts).to.be.eql([]);
            done();
        });
    });
});