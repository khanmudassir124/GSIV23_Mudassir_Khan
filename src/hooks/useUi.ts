import { useSelector } from "react-redux";
import { ApplicationState } from "../redux/store";

const useUI = () => {
  const uiState = useSelector((state: ApplicationState) => state?.ui);
  return uiState;
};

export default useUI();
