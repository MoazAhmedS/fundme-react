import Badge from "../ui/Badge";

function ExampleBadges() {
  return (
    <div className="space-x-2">
       <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="gray">Gray</Badge>
    </div>
  );
}

export default ExampleBadges;
