import {
  UPLOAD_FILE,
  SET_FILE,
  PARSE_LIST,
  SET_LIST,
  UPDATE_CLIENT,
  UPDATE_LEAD,
  DELETE_LEADS,
  MAKE_DNC,
  SUBMIT_LEAD,
  GET_LIEN,
  SEARCH_LIENS,
  POST_LEAD,
  SET_CALLS,
  GET_LEAD,
  GET_LEADS,
  CLEAR_LEAD,
  SET_CURRENT,
  LET_CALL,
  CLEAR_LIENS,
  CLEAR_NUMBER,
  POST_LOGICS,
  GET_FIELDS,
  POST_PREV,
  SET_RECENT,
  SET_RECENTLEAD,
  CLEAR_LEADFIELDS,
  CLEAR_RECENTLEAD,
  UPDATE_PROSPECT,
  POST_NOTE,
  GET_NOTES,
  PUT_NOTE,
  SET_NOTE,
  SET_NOTES,
  DELETE_NOTE,
  ADD_LEXIS,
  SET_PROSPECT,
  GET_NAME,
  PUSH_WORKER,
  PUT_RESO,
  PUT_PAYMENTINFO,
  PUT_PAYMENTSCHEDULE,
  PUT_PAYMENTSCHEDULEITEM,
  DELETE_PAYMENTMETHOD,
  DELETE_PAYMENTSCHEDULEITEM,
  GET_TODAYSPROSPECTS,
  SET_CURRENTMETHOD,
  DELETE_WORKER,
  GET_PAYMENTMETHOD,
  SET_CURRENTCLIENT,
  CLEAR_CURRENTCLIENT,
  UPDATE_PAYMENTSTATUS,
  CLEAR_CURRENTMETHOD,
  ADD_LEXISPROSPECT,
  GET_FILE,
  SET_DOC,
  SET_WORKERS,
  POP_DOC,
  SEND_EMAIL,
  DELETE_DUPS,
  SET_FILTERS,
  DELETE_DOC,
  SET_DOCS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case DELETE_DOC:
      return {
        ...state,
        docs: state.docs.filter((doc) => doc._id !== action.payload),
      };
    case SET_DOCS:
      return {
        ...state,
        docs: action.payload,
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case DELETE_DUPS:
      return {
        ...state,
        prospects: state.prospects.filter(
          (prospect) => prospect.lienid !== action.payload
        ),
      };
    case UPDATE_PAYMENTSTATUS:
      return {
        ...state,
        prospect: action.payload,
      };
    case PUSH_WORKER:
      return {
        ...state,
        caseWorkers: action.payload,
      };
    case SEND_EMAIL:
      return {
        ...state,
        formData: action.payload,
      };
    case GET_FILE:
      return {
        ...state,
        file: action.payload,
      };
    case SET_WORKERS:
      return {
        ...state,
        workers: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case ADD_LEXIS:
      return {
        ...state,
        lead: action.payload,
      };
    case ADD_LEXISPROSPECT:
      return {
        ...state,
        prospect: action.payload,
      };
    case SET_DOC:
      return {
        ...state,
        doc: action.payload,
      };

    case POP_DOC:
      return {
        ...state,
        doc: action.payload,
      };
    case GET_TODAYSPROSPECTS:
      return {
        ...state,
        todaysLeads: action.payload,
      };

    case PUT_PAYMENTSCHEDULE:
      return {
        ...state,
        paymentSchedule: action.payload,
      };
    case PUT_PAYMENTSCHEDULEITEM:
      return {
        ...state,
        newPayment: action.payload,
      };

    case GET_PAYMENTMETHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case POST_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case PUT_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case PUT_RESO:
      return {
        ...state,
        formData: action.payload,
      };
    case PUT_PAYMENTINFO:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case GET_NAME:
      return {
        ...state,
        fullName: action.payload,
      };

    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case SET_CURRENTMETHOD:
      return {
        ...state,
        currentMethod: action.payload,
      };
    case SET_CURRENTCLIENT:
      return {
        ...state,
        currentClient: action.payload,
      };

    case CLEAR_CURRENTMETHOD:
      return {
        ...state,
        currentMethod: null,
      };
    case CLEAR_CURRENTCLIENT:
      return {
        ...state,
        currentClient: null,
      };
    case SET_NOTE:
      return {
        ...state,
        currentNote: action.payload,
      };
    case SET_PROSPECT:
      return {
        ...state,
        prospect: action.payload,
      };

    case UPLOAD_FILE:
      return {
        ...state,
        selectedFile: action.payload,
        loaded: 0,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        file: action.payload,
      };
    case DELETE_LEADS:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead._id !== action.payload),
      };
    case DELETE_PAYMENTSCHEDULEITEM:
      return {
        ...state,
        payment: state.prospect.paymentSchedule.filter(
          (payment) => payment._id !== action.payload
        ),
      };

    case DELETE_WORKER:
      return {
        ...state,
        caseWorker:
          state.prospect.caseWorkers.originators.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ) &&
          state.prospect.caseWorkers.documentProcessors.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ) &&
          state.prospect.caseWorkers.loanProcessors.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ) &&
          state.prospect.caseWorkers.taxPreparers.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ) &&
          state.prospect.caseWorkers.federalReso.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ) &&
          state.prospect.caseWorkers.stateReso.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ) &&
          state.prospect.caseWorkers.upsells.filter(
            (caseWorker) => caseWorker._id !== action.payload
          ),
      };

    case DELETE_PAYMENTMETHOD:
      return {
        ...state,
        paymentMethod: state.prospect.paymentMethods.filter(
          (paymentMethod) => paymentMethod._id !== action.payload
        ),
      };
    case DELETE_LEADS:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead._id !== action.payload),
      };

    case UPDATE_CLIENT:
      return {
        ...state,
        selectedFile: action.payload,
        loaded: 0,
      };

    case UPDATE_LEAD:
      return {
        ...state,
        campaign: action.payload,
      };

    case GET_LIEN:
      return {
        ...state,
        lien: action.payload,
      };
    case SEARCH_LIENS:
      return {
        ...state,
        leads: action.payload,
      };

    case SUBMIT_LEAD:
      return {
        ...state,
        lead: action.payload,
      };
    case SET_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    case MAKE_DNC:
      return {
        ...state,
        dncArray: action.payload,
      };

    case PARSE_LIST:
      return {
        ...state,
        mailList: action.payload,
      };

    case SET_LIST:
      return {
        ...state,
        mailList: action.payload,
      };
    case POST_LEAD:
      return {
        ...state,
        prospect: action.payload,
      };
    case SET_RECENT:
      return {
        ...state,
        recentLeads: action.payload,
      };

    case POST_PREV:
      return {
        ...state,
        lead: action.payload,
      };
    case POST_LOGICS:
      return {
        ...state,
        lead: action.payload,
      };
    case SET_CALLS:
      return {
        ...state,
        calls: action.payload,
      };
    case SET_RECENTLEAD:
      return {
        ...state,
        recentLead: action.payload,
      };

    case GET_LEAD:
      return {
        ...state,
        prospect: action.payload,
      };
    case GET_LEADS:
      return {
        ...state,
        prospectsRes: action.payload,
      };
    case GET_FIELDS:
      return {
        ...state,
        lead: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case LET_CALL:
      return {
        ...state,
        callIn: action.payload,
      };
    case CLEAR_LEAD:
      return {
        ...state,
        lead: {},
      };
    case CLEAR_LEADFIELDS:
      return {
        ...state,
        leadfields: {},
      };
    case CLEAR_RECENTLEAD:
      return {
        ...state,
        recentLead: {},
      };
    case CLEAR_NUMBER:
      return {
        ...state,
        callIn: null,
      };
    case SEARCH_LIENS:
      return {
        ...state,
        leads: action.payload,
      };

    case CLEAR_LIENS:
      return {
        ...state,
        leads: [],
      };
    case UPDATE_LEAD:
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead._id === action.payload._id ? action.payload : lead
        ),
      };

    default:
      return state;
  }
};
