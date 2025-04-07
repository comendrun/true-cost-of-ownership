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
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full gap-4 md:grid-cols-2'>{children}</div>
      </CardContent>
      <CardFooter className='flex justify-between'>{cardFooter}</CardFooter>
    </Card>
  )
}
