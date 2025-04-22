
async function create(model, req, res) {
  try {
    const item = await model.create(req.body);
    return res.status(201).json({
      data: item,
      status: true,
      message: "Record created successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      data: {
        status: false,
        message: "Error creating record",
        b: req.body,
        error: error?.errors?.length
          ? error?.errors[0]?.message
          : "Some error occured",
      },
    });
  }
}

export {create}
