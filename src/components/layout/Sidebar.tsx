import ArticlesList from '../articles/ArticlesList'

function Sidebar() {
  return (
    <div className="w-80 bg-[#191921] border-r border-[#1f2025] rounded-lg overflow-scroll">
      <div className="p-4 border-b border-[#1f2025]">
        <h1 className="text-xl font-bold text-white">اخبار</h1>
      </div>

      {/* News */}
      <ArticlesList />
    </div>
  )
}

export default Sidebar