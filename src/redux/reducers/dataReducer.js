import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false,
};

const copyState = (state, changes) => Object.assign({}, state, changes);

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }

        case SET_SCREAM:
            return {
                ...state,
                scream: copyState(state.scream, action.payload)
            }

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            return {
                ...state,
                scream: copyState(state.scream, action.payload),
                screams: state.screams.map(s => {
                    if (s.screamId === action.payload.screamId)
                        return copyState(s, action.payload)

                    return s;
                })
            };
        // let index = state.screams.findIndex(
        //     (scream) => scream.screamId === action.payload.screamId
        // );
        // state.screams[index] = action.payload;
        // if (state.scream.screamId === action.payload.screamId) {
        //     state.scream = Object.assign({}, state.scream, action.payload)
        // }
        // console.log('from red', state, state.scream)
        // return {
        //     ...state
        // }
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }
        // index = state.screams.findIndex(
        //     (scream) => scream.screamId === action.payload
        // )
        // state.screams.splice(index, 1);
        // return Object.assign({}, state, {
        //     screams: state.screams.filter(s => s.screamId !== action.payload)
        // })
        // state.screams = state.screams.filter(scream => scream.screamId !== action.payload);
        // return {
        //     ...state
        // }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                screams: state.screams.map(s => {
                    if (s.screamId === state.scream.screamId)
                        return {
                            ...s,
                            comments: [action.payload, ...state.scream.comments]
                        }

                    return s;
                }),
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        default:
            return state;
    }
}