@most-read
Feature: Most Popular section validation

  @desktop
  Scenario: Section appears on desktop
    Given I am on the Al Jazeera home page on desktop
    When I look for the Most Popular section
    Then the Most Popular section should be visible

  @desktop
  Scenario: Section contains 10 items
    Given I am on the Al Jazeera home page on desktop
    When I look for the Most Popular section
    Then the Most Popular section should be visible
    And the Most Popular section should contain 10 posts

  @mobile
  Scenario: Section not visible on mobile
    Given I am on the Al Jazeera home page on mobile
    When I look for the Most Popular section
    Then the Most Popular section should not be visible

  @desktop @accessibility
  Scenario: Skip link works
    Given I am on the Al Jazeera home page on desktop
    When I open the bypass blocks menu
    And I choose the "Skip to Most Read" option
    Then the URL should include the Most Read anchor
