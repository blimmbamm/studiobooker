import Typography from '@mui/material/Typography';

type Props = { title: string };

export default function SectionTitle({ title }: Props) {
  return (
    <Typography variant="h5" padding={2} paddingBottom={0}>
      {title}
    </Typography>
  );
}
