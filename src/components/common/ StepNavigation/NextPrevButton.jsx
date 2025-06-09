import { ArrowRight, ArrowLeft } from "lucide-react";
import Button from "../Button/Button_standard";
import Loader from "../loader/Loader";

export const NextButton = ({ onClick, loading = false }) => (
  <Button onClick={onClick} variant="primary" iconOnly>
    {loading ? <Loader size={16} /> : <ArrowRight className="w-4 h-4" />}
  </Button>
);

export const PrevButton = ({ onClick, disabled = false, loading = false }) => (
  <Button onClick={onClick} variant="primary" disabled={disabled} iconOnly>
    {loading ? <Loader size={16} /> : <ArrowLeft className="w-4 h-4" />}
  </Button>
);
