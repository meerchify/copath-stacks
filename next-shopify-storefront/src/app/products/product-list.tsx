"use client";
import { Money } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardFooter, CardHeader } from "@esmate/shadcn/components/ui/card";
import { Loader2 } from "@esmate/shadcn/pkgs/lucide-react";
import { useState } from "react";
import { getProductList } from "./service";
import { useRequest } from "@esmate/react/ahooks";
import { titleize } from "@esmate/utils/string";

interface Props {
  data: Awaited<ReturnType<typeof getProductList>>;
}

export function ProductList(props: Props) {
  const [pages, setPages] = useState([props.data]);
  const lastPage = pages[pages.length - 1];
  const lastCursor = lastPage.edges[lastPage.edges.length - 1].cursor;
  const hasNextPage = lastPage.pageInfo.hasNextPage;

  const request = useRequest(
    async () => {
      setPages([...pages, await getProductList(lastCursor)]);
    },
    {
      manual: true,
    },
  );

  return (
    <section className="container mx-auto py-6">
      <h1 className="sr-only">Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pages
          .flatMap(({ edges }) => edges)
          .map(({ node }) => (
            <Link key={node.handle} href={`/products/${node.handle}`} className="group flex">
              <Card className="flex w-full flex-col overflow-hidden pt-0">
                <CardHeader className="m-0 p-0">
                  <Image
                    src={node.featuredImage!.url as string}
                    alt={node.featuredImage!.altText || ""}
                    height={node.featuredImage!.height as number}
                    width={node.featuredImage!.width as number}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </CardHeader>
                <CardFooter className="mt-auto flex flex-col items-start justify-center gap-2">
                  <h3 className="text-md font-bold">{titleize(node.title)}</h3>
                  <Money className="text-sm" data={node.priceRange.minVariantPrice} />
                </CardFooter>
              </Card>
            </Link>
          ))}
      </div>
      {hasNextPage && (
        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            variant={request.error ? "destructive" : "default"}
            onClick={request.run}
            disabled={request.loading}
            className="min-w-50"
          >
            {request.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {request.loading ? "Loading..." : request.error ? "Try Again" : "Load More Products"}
          </Button>
        </div>
      )}
    </section>
  );
}
