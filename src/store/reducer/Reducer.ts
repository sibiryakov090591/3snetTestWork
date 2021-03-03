import axios from "axios";
import {ThunkAction} from "redux-thunk";


// Constants
const INITIALIZE = "app/INITIALIZE"


// State types
type UserType = {
    id: number
    name: string
    email: string
    status: string
    userCount: number
}
type StateType = {
    count: number
    limit: number
    page: number
    data: UserType[]
}


// Initial state
const initialState: StateType = {
    count: 100,
    limit: 10,
    page: 1,
    data: [
        {
            id: 1,
            name: "Admin 1",
            email: "admin1@3snet.co",
            status: "pending",
            userCount: 442
        },
        {
            id: 2,
            name: "Admin 2",
            email: "admin2@3snet.co",
            status: "disable",
            userCount: 817
        },
        {
            id: 3,
            name: "Admin 3",
            email: "admin3@3snet.co",
            status: "active",
            userCount: 874
        },
        {
            id: 4,
            name: "Admin 4",
            email: "admin4@3snet.co",
            status: "pending",
            userCount: 876
        },
        {
            id: 5,
            name: "Admin 5",
            email: "admin5@3snet.co",
            status: "disable",
            userCount: 437
        },
        {
            id: 6,
            name: "Admin 6",
            email: "admin6@3snet.co",
            status: "active",
            userCount: 167
        },
        {
            id: 7,
            name: "Admin 7",
            email: "admin7@3snet.co",
            status: "pending",
            userCount: 814
        },
        {
            id: 8,
            name: "Admin 8",
            email: "admin8@3snet.co",
            status: "disable",
            userCount: 908
        },
        {
            id: 9,
            name: "Admin 9",
            email: "admin9@3snet.co",
            status: "active",
            userCount: 454
        },
        {
            id: 10,
            name: "Admin 10",
            email: "admin10@3snet.co",
            status: "pending",
            userCount: 394
        }
    ]
}


// Reducer
export const people = (state = initialState, action: ActionsType): StateType=> {

    switch (action.type) {

        case INITIALIZE: {
            return {
                ...state,
                ...action.payload
            }
        }

        default: return state
    }
}


// Actions and Thunks types
type ActionsType = ReturnType<typeof initialize>
type ThunkType = ThunkAction<Promise<void>, UserType[], unknown, ActionsType>


// Actions
const initialize = (payload: StateType) => ({type: INITIALIZE, payload} as const)


// Thunks
export const initializeAPI = (page: number = 1, limit: number = 10): ThunkType => async (dispatch) => {

    const response = await axios.get(`https://white3snet.com/list.php?page=${page}&limit=${limit}`)

    if (response.status === 200) {
        dispatch(initialize(response.data))
    } else if (response.status === 404) {
        alert("Ups... Error 404")
    } else if (response.status === 403) {
        alert("Ups... Error request")
        await dispatch(initializeAPI())
    }
}
