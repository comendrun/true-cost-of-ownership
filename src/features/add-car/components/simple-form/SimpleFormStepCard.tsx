'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function SimpleFormStepCard({
  children,
  cardDescription,
  cardTitle,
  cardFooter
}: {
  children: React.ReactNode
  cardDescription: string
  cardTitle: string
  cardFooter?: React.ReactNode
}) {
  return (
    <Card className='w-[350px] md:w-[500px] xl:w-[800px]'>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full gap-4 lg:grid-cols-2 grid-cols-1'>{children}</div>
      </CardContent>
      <CardFooter className='flex justify-between'>{cardFooter}</CardFooter>
    </Card>
  )
}
