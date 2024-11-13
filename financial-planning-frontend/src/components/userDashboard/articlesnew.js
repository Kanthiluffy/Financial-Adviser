"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui_articles/card"
import { Badge } from "./ui_articles/badge"
import { Button } from "./ui_articles/button"
import { ScrollArea } from "./ui_articles/scroll-area"
import { Book } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "5 Essential Retirement Savings Strategies",
    description:
      "Discover key strategies to boost your retirement savings and secure your financial future.",
    category: "Savings",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Understanding Social Security Benefits",
    description:
      "Learn how Social Security works and how it fits into your retirement plan.",
    category: "Benefits",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Investing for Retirement: A Beginner's Guide",
    description:
      "Get started with retirement investing with this comprehensive guide for beginners.",
    category: "Investing",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Healthcare Costs in Retirement: What to Expect",
    description:
      "Prepare for healthcare expenses in retirement with this overview of potential costs.",
    category: "Healthcare",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Creating a Retirement Budget That Works",
    description:
      "Learn how to create and stick to a realistic retirement budget to make your savings last.",
    category: "Budgeting",
    readTime: "8 min read"
  }
]

export function ArticlesComponent() {
  return (
    <Card className="w-full max-w-8xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Retirement Planning Articles
        </CardTitle>
        <CardDescription>
          Stay informed with the latest retirement planning tips and strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {articles.map(article => (
            <Card key={article.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {article.title}
                  </CardTitle>
                  <Badge variant="secondary">{article.category}</Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {article.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{article.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <Book className="mr-2 h-4 w-4" />
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
