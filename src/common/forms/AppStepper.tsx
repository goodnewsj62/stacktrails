import { Stepper, Step, StepLabel, Button, StepperProps } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

type StepperPropsWithControl<TFieldValues extends FieldValues = FieldValues> = Omit<
  StepperProps,
  "activeStep" | "orientation"
> & {
  control?: Control<TFieldValues, any>;  // Optional for react-hook-form
  steps: { label: string; assignee: string; date: string }[];  // Array of steps with details
  activeStep: number;  // Index of the active step
  onComplete: () => void;  // Handler for completing the task
  completeButtonLabel?: string;  // Customizable label for the "Mark as Completed" button
  showCompleteButtonOnStep?: number;  // Step index where the "Mark as Completed" button should appear
  name?: string;  // Optional name for form integration
  isVertical?: boolean;  // To toggle vertical or horizontal orientation
};

const AppStepper = <T extends FieldValues = FieldValues>({
  control,
  steps,
  activeStep,
  onComplete,
  completeButtonLabel = "Finish Task",  // Default button label
  showCompleteButtonOnStep = 2,  // Default: "In Progress" step (index 2)
  name,
  isVertical = true,  // Default: vertical orientation
  ...props
}: StepperPropsWithControl<T>) => {
  const orientation = isVertical ? "vertical" : "horizontal";

  const stepperElement = (
    <Stepper activeStep={activeStep} orientation={orientation} {...props}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>
            <div>
              <strong>{step.label}</strong>
              <p>By: {step.assignee}</p>
              <p>{step.date}</p>
            </div>
          </StepLabel>
          {/* Show the custom button on the specified step */}
          {index === showCompleteButtonOnStep && (
            <div style={{ marginTop: "8px", marginBottom: "8px"}}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onComplete}
                // endIcon={<span>✓</span>}
                size="small"
              >
                {completeButtonLabel}
              </Button>
            </div>
          )}
        </Step>
      ))}
    </Stepper>
  );

  return control ? (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => <div {...field}>{stepperElement}</div>}
    />
  ) : (
    stepperElement
  );
};

export default AppStepper;
