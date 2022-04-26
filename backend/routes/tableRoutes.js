const mongoose = require('mongoose');

const Table = mongoose.model('table');

module.exports = app => {

  app.post("/api/table/add_table", async (req, res) => {
    const table = {
      table: req.body.table,
      qrcode: req.body.qrcode,
      used: false,
    }

    let findrlt = await Table.find({qrcode: req.body.qrcode});
    if(findrlt.length) {
      res.send({
        success: false,
        msg: 'already existing qrcode',
      });
      return;
    }

    findrlt = await Table.find({table: req.body.table});
    if(findrlt.length) {
      res.send({
        success: false,
        msg: 'already existing table name',
      });
      return;
    }

    if(!findrlt.length) {
      ntable = new Table(table);
      ntable.save().then(async rlt => {
        if(rlt) {
          res.json({
            success: true,
            _id: rlt._id
          });
        } else {
          res.json({
            success: false,
            msg: 'failed to create new table.'
          });
        }
      }).catch(e => {
        res.json({
          success: false,
          msg: 'error in saving to database',
        })
      })
    }
    
  });

  app.post('/api/table/get_tables', async (req, res) => {
    const table = await Table.find({});
    if(table.length) {
      res.json({
        success: true,
        items: table,
      });
    } else {
      res.json({
        success: false,
        msg: 'there is no table',
      })
    }
  });

  app.post('/api/table/update_table', (req, res) => {
    Table.find({_id: req.body._id}).then(table => {
      if (!table.length) {
        res.json({
          success: false,
          msg: 'not found such table',
        })
      } else {
        Table.findOneAndUpdate(
          {_id: req.body._id},
          {table: req.body.table, qrcode: req.body.qrcode, used: req.body.used,},
          {upsert: true},
          (err => {
            if(err) {
              res.json({
                success: false,
                msg: 'failed',
              });
            } else {
              res.json({
                success: true,
              });
            }
          })
        )
      }
    });
  });
  
  app.post('/api/table/delete_table', async (req, res) => {
    Table.deleteOne({_id: req.body._id}, (err) => {
      if(err) {
        res.json({
          success: false,
          msg: 'failed to remove table.'
        });
      } else {
        res.json({
          success: true,
        })
      }
    });
  });
};
