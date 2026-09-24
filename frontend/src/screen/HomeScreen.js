import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { listMenuItems } from '../actions/menuItemActions';
import { listCategories } from '../actions/categoryActions';
import Loader from '../components/Loader';
import Header from '../components/Header';
import SquareCard from '../components/SquareCard';
import RoundCard from '../components/RoundCard';
import Footer from '../components/Footer';
import Cat from '../components/Cat';
import MobileOrderBar from '../components/MobileOrderBar';
import { apiUrl } from '../config';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [tableExists, setTableExists] = useState(false);
  const [tableName, setTableName] = useState('');
  const [query, setQuery] = useState('');

  const menuItemList = useSelector((state) => state.menuItemList);
  const { error, loading, menuItems } = menuItemList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    fetchTables();
    dispatch(listMenuItems());
    dispatch(listCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchTables = async () => {
    try {
      const response = await fetch(apiUrl('/api/menuItems/tables'));
      if (response.ok) {
        const data = await response.json();
        const match = data.find((table) => table._id === Number(id));
        setTableExists(!!match);
        if (match) {
          localStorage.setItem('tableId', id);
          setTableName(match.name || '');
        }
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  if (!tableExists) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">🍽️</span>
        <h1 className="text-xl font-semibold text-slate-900">Table not found</h1>
        <p className="max-w-sm text-sm text-slate-500">
          This table link isn't valid. Please scan the QR code on your table to view the menu.
        </p>
      </div>
    );
  }

  // Card style is set globally by the admin; pick a grid that suits it.
  const isRound = menuItems && menuItems.length > 0 && menuItems[0].card_type !== 'square';
  const gridClass = isRound
    ? 'grid-cols-1 lg:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  // Client-side search across item names.
  const q = query.trim().toLowerCase();
  const items = (menuItems || []).filter((item) => !q || (item.name || '').toLowerCase().includes(q));

  // Preferred ordering comes from the category list; fall back to order of appearance.
  const categoryOrder =
    categories && categories.length
      ? categories.map((c) => c.name)
      : [...new Set((menuItems || []).map((i) => i.category).filter(Boolean))];

  // Group the (filtered) items under their category, even on the "All" view.
  const groups = [];
  categoryOrder.forEach((name) => {
    const groupItems = items.filter((item) => item.category === name);
    if (groupItems.length) groups.push({ name, items: groupItems });
  });
  const other = items.filter((item) => !item.category || !categoryOrder.includes(item.category));
  if (other.length) groups.push({ name: 'Other', items: other });

  const renderCards = (list) =>
    list.map((menuItem) =>
      menuItem.card_type === 'square' ? (
        <SquareCard key={menuItem._id} menuItem={menuItem} />
      ) : (
        <RoundCard key={menuItem._id} menuItem={menuItem} />
      )
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Cat />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-8">
        {/* Hero */}
        <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-4 text-white shadow-card sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
            {tableName ? tableName : 'Welcome'}
          </p>
          <h1 className="mt-0.5 text-xl font-bold sm:text-2xl">Served</h1>
          <p className="mt-1 max-w-3xl text-sm text-white/85">
            Browse the menu and tap a dish to start your order. Your kitchen will be notified right away.
          </p>
        </section>

        {/* Search */}
        <div className="relative mb-7">
          <BsSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu..."
            aria-label="Search the menu"
            className="input pl-10"
          />
        </div>

        {loading ? (
          <Loader full />
        ) : error ? (
          <p className="py-12 text-center text-sm text-rose-500">{error}</p>
        ) : !menuItems || menuItems.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-400">No menu items available yet.</p>
        ) : groups.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-400">
            No dishes match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="space-y-9">
            {groups.map((group) => (
              <section key={group.name}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-bold capitalize text-slate-900">{group.name}</h2>
                  <span className="shrink-0 text-xs font-medium text-slate-400">
                    {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className={`grid gap-5 ${gridClass}`}>{renderCards(group.items)}</div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <MobileOrderBar />
    </div>
  );
};

export default HomeScreen;
