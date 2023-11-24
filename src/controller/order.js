require("dotenv").config();
const { MongoClient, ObjectID } = require("mongodb");
const {
  sendErrorResponse,
  sendSuccessfulResponse,
} = require("../utils/response");

// Connection URL
const client = new MongoClient(`${process.env.DATABASE_URL}`);

// Database Name
const dbName = `${process.env.DATABASE_NAME}`;

const getUserOrderItemsController = async (req, res, next) => {
  try {
    const { seller_id } = req.user;

    // database connection
    await client.connect();
    const database = client.db(dbName);
    const orderItemList = database.collection("orderItems");

    const pipeline = [
      { $match: { seller_id } },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "product_id",
          as: "products",
        },
      },
      { $sort: { price: 1 } },
      { $limit: 20 },
    ];

    const order = await orderItemList.aggregate(pipeline).toArray();

    const orderListData = order.map((item) => ({
      id: item.order_item_id,
      product_id: item.product_id,
      product_category: item.products[0].product_category_name,
      price: item.price,
      date: item.shipping_limit_date,
    }));

    const orderListDataResult = {
      data: orderListData,
      total: order.length,
      limit: 20,
      offset: 560,
    };

    sendSuccessfulResponse(res, 200, orderListDataResult);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  } finally {
    await client.close();
  }
};


const deleteUserOrderItemByIdController = async (req, res, next) =>{
    try {

    const { id } = req.params
        console.log("id ", id )
        
    // database connection
    await client.connect();
    const database = client.db(dbName);
    const orderItemList = database.collection("orderItems");

//     const order = await orderItemList.aggregate([ {
//         $match: { _id: id }
//     },
//     {
//         $replaceRoot: { newRoot: "$_id" }
//     }
// ]).toArray()

        const order = await orderItemList.aggregate( [
          { $match: { order_id: id } },
          { $limit: 1 }
        ] ).toArray()

    if(!order){
        sendErrorResponse(res, 404, "order not found")
    }

    const deletedUserOrder = await orderItemList.deleteOne({ order_id: id });


    if(!deletedUserOrder || deletedUserOrder.deletedCount === 0 ){
        sendErrorResponse(res, 404, "Order item failed to delete")
    }

    sendSuccessfulResponse(res, 200, `${deletedUserOrder.deletedCount} document(s) was/were deleted.`)

    } catch (error) {
        console.log(error)
        sendErrorResponse(res, 500, error)
    } finally{
        await client.close()
    }
}

const updateUserDetailsController = async ( req, res, next ) => {
    try {
        const { seller_id } = req.user;

        const { city, state } = req.body

        // database connection
        await client.connect();
        const database = client.db(dbName);
        const users = database.collection("seller");

        const updateField = {}

        if(city !== undefined){
            updateField.seller_city = city
        }

        if(state !== undefined){
            updateField.seller_state = state
        }
        const updatedUser = await users.updateMany({ seller_id: seller_id }, { $set: updateField })

        if(!updatedUser || updatedUser.matchedCount === 0){
             sendErrorResponse(res, 404, "user details failed to update")
        }

        const user = await users.findOne({ seller_id: seller_id })

        const updatedUserData = {
           city: user.seller_city,
           state: user.seller_state
        }

        sendSuccessfulResponse(res, 200, updatedUserData)

    } catch (error) {
        sendErrorResponse(res, 500, error)
    } finally {
        await client.close();
    }
}

module.exports = {
  getUserOrderItemsController,
  deleteUserOrderItemByIdController,
  updateUserDetailsController
};
