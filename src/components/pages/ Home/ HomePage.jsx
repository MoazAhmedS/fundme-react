import Button from "../../common/Button/Button_standard";
import TestStepNav from "../../common/ StepNavigation/TestStepNav";
import CheckboxExample from "../../common/Checkbox/CheckboxExample";
import NumberExample from "../../common/NumberInput/NumberExample";
import TextInputTest from "../../common/TextInput/TextInputTest";

function HomePage() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-x-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <TestStepNav />
       <CheckboxExample/>
       <NumberExample/>
       <TextInputTest/>
     
    </div>
  );
}

export default HomePage;
