Feature: Most Popular section validation @most-read

Scenario: Section appears on desktop @desktop
  Given I am on the Al Jazeera home page on desktop
  When I look for the Most Popular section
  Then the Most Popular section should be visible

Scenario: Section contains 10 items @desktop
  Given I am on the Al Jazeera home page on desktop
  When I look for the Most Popular section
  Then the Most Popular section should contain 10 posts

Scenario: Section not visible on mobile @mobile
  Given I am on the Al Jazeera home page on mobile
  Then the Most Popular section should not appear on mobile

Scenario: Skip link works using keyboard navigation @desktop @accessibility
  Given I am on the Al Jazeera home page on desktop
  When I use the keyboard to reach the skip link
  And I activate the skip link
  Then focus should move to the Most Read section
