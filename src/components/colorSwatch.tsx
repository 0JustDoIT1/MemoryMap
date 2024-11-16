import ColorPicker, {returnedResults, Swatches} from 'reanimated-color-picker';
interface CustomColorSwatch {
  value: string;
  onChange: ((colors: returnedResults) => void) | undefined;
}
const CustomColorSwatch = ({value, onChange}: CustomColorSwatch) => {
  return (
    <ColorPicker value={value} onChange={onChange}>
      <Swatches />
    </ColorPicker>
  );
};
export default CustomColorSwatch;
