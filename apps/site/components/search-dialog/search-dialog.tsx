'use client';

import { useState } from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { fetchClient } from 'fumadocs-core/search/client/fetch';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';

const VERSIONS = ['v4', 'v3', 'v2', 'v1'];
const LATEST = 'v4';

/**
 * fumadocs' default dialog renders its tag footer as a sibling of the dialog
 * portal, which leaks the version chips onto every page. Rebuilt so the tags
 * live inside the dialog.
 */
export default function VersionedSearchDialog(props: SharedProps) {
  const [tag, setTag] = useState(LATEST);

  const { search, setSearch, query } = useDocsSearch({
    client: fetchClient({ tag }),
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <TagsList
          tag={tag}
          onTagChange={(value) => setTag(value ?? LATEST)}
          className="bg-fd-secondary/50 border-t px-3 py-2"
        >
          {VERSIONS.map((version) => (
            <TagsListItem key={version} value={version}>
              {version}
            </TagsListItem>
          ))}
        </TagsList>
      </SearchDialogContent>
    </SearchDialog>
  );
}
