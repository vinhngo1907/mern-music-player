import * as types from '../constant/action_constant';

const initialState = {
  showAnalyzer: false,
  dropDown: { activeId: '', show: false, where: '' },
  showQueue: false,
  slideInRight: false,
  showModal: false,
  isLoading: false,
  isFading: false,
  downloadProgress: {
    isDownloading: false,
    id: '',
    percent: 0,
  },
};

export default function (state = initialState, action) {
    return {
        ...state,
    }
}