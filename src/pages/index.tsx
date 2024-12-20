import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Card from "../components/index/Card"
import Header from "../components/Header"
import Newsletter from "../components/index/Newsletter"
import Team from "../components/index/Team"
import Sponsor from "../components/index/Sponsor"
import Announcements from "../components/announcements/Announcements"
import { AnnouncementInfo } from "../components/announcements/models/announcement"
import fs from "fs"
import { serialize } from "next-mdx-remote/serialize"
import { InferGetStaticPropsType } from "next"
// console.log("hello world")

function IndexPage(source: InferGetStaticPropsType<typeof getStaticProps>) {
  return (<Layout>
    <SEO title={null} />
    <div className="bg-gray-100">
      <Header noBanner/>
      <div className="bg-gray-900 sm:-mb-8">
        {/*Banner Padding*/}
        {/*<div className="h-12" />*/}

        <div className="h-36 sm:h-48" />
        <div className="max-w-screen-xl px-4 sm:px-6 mx-auto sm:-mb-8">
          <h1 className="text-4xl tracking-tight leading-10 sm:leading-none font-extrabold text-white sm:text-6xl lg:text-5xl xl:text-6xl">
            IDE Initiative
          </h1>
          <p className="mt-6 mb-6 text-gray-200 text-xl">
            We promote cross platform development and open source discipline.
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="h-32 sm:h-64 w-full"
          preserveAspectRatio="none"
        >
          <path
            className="text-gray-100"
            fill="currentColor"
            fillOpacity="1"
            d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,181.3C672,203,768,245,864,245.3C960,245,1056,203,1152,165.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      <div className="max-w-screen-xl px-4 sm:px-6 mx-auto pb-12 sm:pb-16 flex flex-col md:flex-row">
        
        <div className="flex-[1_0_0px] pt-8 md:pt-0 flex flex-col">
          <h1 className="pr-0 md:pr-8 text-2xl text-left tracking-tight leading-10 sm:leading-none font-extrabold text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl mb-6 sm:mb-12">
            Announcements
          </h1>
          <Announcements announcements={source.list} />
        </div>
          
      </div>
    </div>
    <Newsletter />
    <Sponsor />
    <Team />
  </Layout>
)
}


export async function getStaticProps(
  ) {
    const data = fs.readdirSync('src/components/announcements/data')
    const list = await Promise.all(data.map(async (file)=> {
      const mdxSource = await serialize(fs.readFileSync('src/components/announcements/data/'+file), { parseFrontmatter: true });
      return mdxSource;
    }))
    return {
      props: {
        list: list
      }
    }
  }
  

export default IndexPage
