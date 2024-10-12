import { Button } from 'react-bootstrap';

const CustomButton = (props) => {

  const type = props.type || 'button';
  const variant = props.variant || 'primary';
  const onClick = props.onClick;

  return (
    <Button type={type} variant={variant} onClick={onClick} {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;