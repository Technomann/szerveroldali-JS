const expect = require('chai').expect;
const getCommentsMW = require('../../../../middlewares/comment/getCommentsMW');

describe('getComments middleware ', function () {

    it('should set res.locals.spacecraft.comments with comments from db', (done) => {
        const mw = getCommentsMW({
            CommentModel:  {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({spacecraft: '13'});
                    cb(null, ['mockcomment1', 'mockcomment2']);
                }
            }
        });

        const resMock = {
            locals: {
                spacecraft: {

                }
            }
        }
        mw({
            params: {
                spacecraftid: '13'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.spacecraft.comments).to.be.eql(['mockcomment1', 'mockcomment2']);
            done();
        });
    });

    it('should set res.locals.error message and code, and should call res.redirect with /error', (done) => {
        const mw = getCommentsMW({
            CommentModel:  {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({spacecraft: '13'});
                    cb('dberror', null);
                }
            }
        });

        const resMock = {
            locals: {
                spacecraft: {

                },
                error: {

                }
                
            }, 
            redirect: (route) => {
                expect(route).to.be.eql('/error');
                expect(resMock.locals.error.message).to.be.eql('Cannot get comments from DB.');
                expect(resMock.locals.error.code).to.be.eql('711');
                done();
            }
        };
        
        mw({
            params: {
                spacecraftid: '13'
            }
        },
        resMock,
        () => {});
    });

    it('no matching comments in the db, res.locals.comments should be empty array', (done) => {
        const mw = getCommentsMW({
            CommentModel:  {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({spacecraft: '13'});
                    cb(undefined, []);
                }
            }
        });

        const resMock = {
            locals: {
                spacecraft: {

                }
            }
        };
        
        mw({
            params: {
                spacecraftid: '13'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.spacecraft.comments).to.be.eql([]);
            done();
        });
    });
});