export const initialCoursesState = [];


export const coursesReducer = (state, action) => {
    console.log(action, "action")
    switch (action.type) {
        case "ADD_COURSE":
            console.log("In add course")
            let data = [...state, ...action.course]
            console.log(data, "this is the new data")
            return data
        case "DELETE_COURSE":
            let newData = [...state.filter((course) => course._id !== action.id)]
            console.log(newData, " returnning this afte deletion")
            return newData;
        default:
            return { ...state }
    }
}