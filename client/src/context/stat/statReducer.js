import {
  GET_FILTER,
  GET_CAMPAIGN,
  GET_IDARRAY,
  GET_CURRENTEMAIL,
  GET_LISTLENGTH,
  GET_TODAYCALLS,
  GET_TODAYPROSPECTS,
  GET_TODAYLEADS,
  GET_TODAYPAYMENTS,
  GET_PERIODCALLS,
  GET_PERIODPROSPECTS,
  GET_PERIODLEADS,
  GET_PERIODPAYMENTS,
  GET_PERIOD,
  GET_PAYMENTS,
  SEARCH_PAYMENTDATES,
  CLEAR_FILTER,
  FILTER_PAYMENTS,
  UPDATE_PAYMENTSTATUS,
  GET_TODAYS,
  GET_CLIENTPAYMENTS,
  SET_PERIOD,
  SET_TRACKINGPAYMENT,
  COMMISSION_PAYMENT,
  GET_RECURRING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TODAYCALLS:
      return {
        ...state,
        todayCalls: action.payload,
      };
    case GET_PERIODCALLS:
      return {
        ...state,
        periodCalls: action.payload,
      };
    case GET_PERIODLEADS:
      return {
        ...state,
        periodLeads: action.payload,
      };
    case GET_PERIODPROSPECTS:
      return {
        ...state,
        periodProspects: action.payload,
      };
    case GET_PERIODPAYMENTS:
      return {
        ...state,
        periodPayments: action.payload,
      };
    case GET_PERIOD:
      return {
        ...state,
        periodPaymentSummary: action.payload,
      };

    case GET_RECURRING:
      return {
        ...state,
        recurring: action.payload,
      };
    case GET_TODAYLEADS:
      return {
        ...state,
        todayLeads: action.payload,
      };
    case GET_TODAYPROSPECTS:
      return {
        ...state,
        todayProspects: action.payload,
      };
    case GET_TODAYPAYMENTS:
      return {
        ...state,
        todayPayments: action.payload,
      };

    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      };
    case SET_TRACKINGPAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case COMMISSION_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case SET_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case GET_CLIENTPAYMENTS:
      return {
        ...state,
        billingStatus: action.payload,
      };
    case FILTER_PAYMENTS:
      return {
        ...state,
        filtered: state.payments.filter((payment) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            payment.paymentMethod.match(regex) ||
            payment.paymentId.match(regex) ||
            payment.paymentAmount.toString().match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SEARCH_PAYMENTDATES:
      return {
        ...state,
        filtered: action.payload,
      };
    case GET_TODAYS:
      return {
        ...state,
        today: action.payload,
      };
    case UPDATE_PAYMENTSTATUS:
      return {
        ...state,
        payment: action.payload,
      };

    case GET_FILTER:
      return {
        ...state,
        filterSelected: action.payload,
      };
    case GET_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
      };
    case GET_CURRENTEMAIL:
      return {
        ...state,
        currentEmail: action.payload,
      };

    case GET_IDARRAY:
      return {
        ...state,
        idArray: action.payload,
      };
    case GET_LISTLENGTH:
      return {
        ...state,
        listLength: action.payload,
      };

    default:
      return state;
  }
};
