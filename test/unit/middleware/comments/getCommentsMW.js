const expect = require('chai').expect;
const getCommentsMW = require('../../../../middlewares/comment/getCommentsMW');

describe('getComments middleware ', function () {

    it('should return comments', function (done) {
        const mw = getCommentsMW({
            CommentModel:  {
                find: (p1, cb) => {
                    cb(null, ['mockcomment1', 'mockcomment2']);
                }
            }
        });
        mw({},{
            locals: {
                spacecraft: {
                    _id: '13'
                }
            }
        }, () => {
             
        });
    });
});